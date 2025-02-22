import React, { useState } from 'react'
import { Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

type OptionType = 'S' | 'T' // 선택형 | 직접 입력형
type OptionMode = 'O' | 'M' // 단독형 | 조합형
type OptionRegisterType = 'T' | 'O' | 'M'

interface Option {
  type: OptionType
  mode: OptionMode
  name: string
  values: string // 선택형일 때만 사용 (콤마로 구분된 값들)
  basePrice?: number
}

interface FinalOption {
  combination: string[]
  optionType: OptionRegisterType
  price: number
}

export default function CustomOption({ optionRegister }: any) {
  const [optionType, setOptionType] = useState<OptionType>('S')
  const [optionMode, setOptionMode] = useState<OptionMode>('O')
  const [options, setOptions] = useState<Option[]>([
    { type: 'S', mode: 'O', name: '', values: '', basePrice: 0 },
  ])
  const [finalOptions, setFinalOptions] = useState<FinalOption[]>([])

  // 옵션 입력 필드를 추가
  const handleAddOptionField = () => {
    setOptions([
      ...options,
      {
        type: optionType,
        mode: optionMode,
        name: '',
        values: '',
        basePrice: 0,
      },
    ])
  }

  // 특정 옵션 입력 필드를 삭제
  const handleDeleteOptionField = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  // 조합형 옵션의 모든 조합을 생성하는 함수
  const generateCombinations = (
    arr: string[][],
    prefix: string[] = []
  ): string[][] => {
    if (arr.length === 0) return [prefix]
    const [first, ...rest] = arr
    return first.flatMap((value) =>
      generateCombinations(rest, [...prefix, value])
    )
  }

  // 최종 옵션 목록 생성 및 등록
  const handleApplyOptions = () => {
    // 새 후보 항목들을 생성
    let newCandidates: FinalOption[] = []
    if (optionType === 'T') {
      // 직접 입력형: 옵션명만 사용
      options.forEach((option) => {
        if (option.name.trim() !== '') {
          newCandidates.push({
            combination: [option.name],
            optionType: 'T',
            price: 0,
          })
        }
      })
    } else {
      if (optionMode === 'O') {
        // 단독형: 옵션값을 분리해서 "옵션명 / 옵션값" 형식으로 생성
        options.forEach((option) => {
          option.values
            .split(',')
            .map((v) => v.trim())
            .forEach((value) => {
              newCandidates.push({
                combination: [option.name, value],
                optionType: 'O',
                price: option.basePrice || 0,
              })
            })
        })
      } else if (optionMode === 'M') {
        // 조합형: 모든 옵션의 옵션값만 사용해 조합 생성
        const parsedOptions = options.map((option) =>
          option.values.split(',').map((v) => v.trim())
        )
        const combinations = generateCombinations(parsedOptions)
        combinations.forEach((combination) => {
          newCandidates.push({
            combination,
            optionType: 'M',
            price: 0,
          })
        })
      }
    }

    // 기존 최종 옵션과 새 후보 항목을 병합(중복 제외)
    const unionCandidates = [...finalOptions]
    newCandidates.forEach((candidate) => {
      const candidateKey = candidate.combination.join('|')
      const exists = unionCandidates.some(
        (item) =>
          item.combination.join('|') === candidateKey &&
          item.optionType === candidate.optionType
      )
      if (!exists) {
        unionCandidates.push(candidate)
      }
    })
    setFinalOptions(unionCandidates)

    // prodOptRegisterSchema 구조에 맞게 등록할 옵션 객체 배열 생성
    // productUuid는 빈 문자열로, optName은 조합형은 '-'로, 단독형/직접입력형은 ' / '로 결합
    const registrationPayload = unionCandidates.map((candidate) => ({
      productUuid: '',
      optName:
        candidate.optionType === 'M'
          ? candidate.combination.join('-')
          : candidate.combination.join(' / '),
      optionType: candidate.optionType,
    }))

    // optionRegister은 useState의 set 메소드이므로, payload 배열을 전달
    optionRegister(registrationPayload)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>옵션 설정</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-between items-end mb-4'>
          {/* 옵션 유형 및 방식 선택 */}
          <div className='space-y-2'>
            <Label>옵션 유형</Label>
            <RadioGroup
              onValueChange={(value: string) =>
                setOptionType(value as OptionType)
              }
              defaultValue={optionType}
              className='flex space-x-2'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='S' id='S' />
                <Label htmlFor='S'>선택형</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='T' id='T' />
                <Label htmlFor='T'>직접 입력형</Label>
              </div>
            </RadioGroup>

            {optionType === 'S' && (
              <div className='space-y-2'>
                <Label>옵션 방식</Label>
                <RadioGroup
                  onValueChange={(value: string) =>
                    setOptionMode(value as OptionMode)
                  }
                  defaultValue={optionMode}
                  className='flex space-x-2'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='O' id='O' />
                    <Label htmlFor='O'>단독형</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='M' id='M' />
                    <Label htmlFor='M'>조합형</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>

          <div className='flex md:space-x-4 space-x-0 md:space-y-0 space-y-4 md:flex-row flex-col'>
            <Button type='button' onClick={handleAddOptionField}>
              옵션 추가
            </Button>
            <Button
              type='button'
              variant='destructive'
              onClick={() => setOptions([])}
            >
              전체 삭제
            </Button>
          </div>
        </div>

        {/* 옵션 입력 필드 */}
        {optionType === 'T' ? (
          <div className='space-y-2'>
            <Label>옵션 추가 (직접 입력형)</Label>
            {options.map((option, index) => (
              <div key={index} className='flex space-x-4'>
                <Input
                  value={option.name}
                  onChange={(e) => {
                    const updatedOptions = [...options]
                    updatedOptions[index].name = e.target.value
                    setOptions(updatedOptions)
                  }}
                  placeholder='옵션명'
                />
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => handleDeleteOptionField(index)}
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className='space-y-2'>
            <Label>옵션 추가 (선택형)</Label>
            {options.map((option, index) => (
              <div key={index} className='flex space-x-4'>
                <Input
                  value={option.name}
                  onChange={(e) => {
                    const updatedOptions = [...options]
                    updatedOptions[index].name = e.target.value
                    setOptions(updatedOptions)
                  }}
                  placeholder='옵션명'
                />
                <Input
                  value={option.values}
                  onChange={(e) => {
                    const updatedOptions = [...options]
                    updatedOptions[index].values = e.target.value
                    setOptions(updatedOptions)
                  }}
                  placeholder='옵션값 (콤마로 구분)'
                />
                <Input
                  type='number'
                  value={option.basePrice}
                  onChange={(e) => {
                    const updatedOptions = [...options]
                    updatedOptions[index].basePrice = Number(e.target.value)
                    setOptions(updatedOptions)
                  }}
                  placeholder='기본 가격'
                />
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => handleDeleteOptionField(index)}
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        )}

        <Separator />
        <div className='flex justify-between'>
          <Button type='button' onClick={handleApplyOptions}>
            옵션 목록 적용
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={() => setFinalOptions([])}
          >
            전체 삭제
          </Button>
        </div>

        {finalOptions.length > 0 && (
          <div>
            <Label className='mt-4'>최종 옵션 목록</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>옵션명</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>삭제</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalOptions.map((optionSet, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {optionMode === 'M'
                        ? optionSet.combination.join('-')
                        : optionSet.combination.join(' / ')}
                    </TableCell>
                    <TableCell>{optionSet.optionType}</TableCell>
                    <TableCell>{optionSet.price}</TableCell>
                    <TableCell className='w-24'>
                      <Button
                        type='button'
                        variant='destructive'
                        onClick={() =>
                          setFinalOptions(
                            finalOptions.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <Minus />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
