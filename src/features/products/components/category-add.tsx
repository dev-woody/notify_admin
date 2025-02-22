import { useEffect, useState } from 'react'
import { Category } from '@/data/schema/product/categorySchema'
import { useCategoryFindByDepth } from '@/queries/product/useCategoryQuery'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Separator } from '@/components/ui/separator'

interface SelectedCategory {
  label: string
  value: string
  level: number
  // 하위 항목 제거 시 부모 정보를 활용하기 위한 필드
  ancestors: { label: string; value: string }[]
}

export default function CategoryReg({ setCategories }: any) {
  const { data: categories } = useCategoryFindByDepth('1')
  const [cate2nd, setCate2nd] = useState<Category[]>([])
  const [cate3rd, setCate3rd] = useState<Category[]>([])

  // 현재 선택한 1차, 2차를 저장하여 하위 선택 시 상위 정보를 참조합니다.
  const [selectedLevel1, setSelectedLevel1] = useState<Category | null>(null)
  const [selectedLevel2, setSelectedLevel2] = useState<Category | null>(null)
  // 선택한 카테고리들을 관리합니다.
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([])

  useEffect(() => {
    const selectedUUIDs = selectedCategories.map((item) => item.value)
    setCategories(selectedUUIDs)
  }, [selectedCategories, setCategories])

  // 지정한 카테고리와 해당 카테고리를 조상으로 갖는 항목들을 모두 제거합니다.
  const removeSelection = (categoryUuid: string) => {
    setSelectedCategories((prev) =>
      prev.filter((item) => {
        if (item.value === categoryUuid) return false
        if (item.ancestors.some((a) => a.value === categoryUuid)) return false
        return true
      })
    )
  }

  // 1차 카테고리 클릭: 선택된 상태면 제거, 아니면 추가합니다.
  const handleLevel1Click = (category: Category) => {
    const exists = selectedCategories.some(
      (item) => item.value === category.categoryUuid && item.level === 1
    )
    if (exists) {
      // 1차 및 관련 하위 항목 제거
      removeSelection(category.categoryUuid)
    } else {
      setSelectedCategories((prev) => [
        ...prev,
        {
          label: category.categoryName,
          value: category.categoryUuid,
          level: 1,
          ancestors: [],
        },
      ])
    }
    setSelectedLevel1(category)
    setCate2nd(category.subCategories || [])
    setSelectedLevel2(null)
    setCate3rd([])
  }

  // 2차 카테고리 클릭: 선택 토글
  const handleLevel2Click = (category: Category) => {
    const exists = selectedCategories.some(
      (item) => item.value === category.categoryUuid && item.level === 2
    )
    if (exists) {
      removeSelection(category.categoryUuid)
    } else {
      if (selectedLevel1) {
        setSelectedCategories((prev) => [
          ...prev,
          {
            label: category.categoryName,
            value: category.categoryUuid,
            level: 2,
            ancestors: [
              {
                label: selectedLevel1.categoryName,
                value: selectedLevel1.categoryUuid,
              },
            ],
          },
        ])
      }
    }
    setSelectedLevel2(category)
    setCate3rd(category.subCategories || [])
  }

  // 3차 카테고리 클릭: 선택 토글하며 상위(1차, 2차)가 선택되어 있지 않으면 함께 추가
  const handleLevel3Click = (category: Category) => {
    if (selectedLevel1 && selectedLevel2) {
      const exists = selectedCategories.some(
        (item) => item.value === category.categoryUuid && item.level === 3
      )
      if (exists) {
        removeSelection(category.categoryUuid)
      } else {
        const newSelections: SelectedCategory[] = []
        if (
          !selectedCategories.some(
            (item) =>
              item.value === selectedLevel1.categoryUuid && item.level === 1
          )
        ) {
          newSelections.push({
            label: selectedLevel1.categoryName,
            value: selectedLevel1.categoryUuid,
            level: 1,
            ancestors: [],
          })
        }
        if (
          !selectedCategories.some(
            (item) =>
              item.value === selectedLevel2.categoryUuid && item.level === 2
          )
        ) {
          newSelections.push({
            label: selectedLevel2.categoryName,
            value: selectedLevel2.categoryUuid,
            level: 2,
            ancestors: [
              {
                label: selectedLevel1.categoryName,
                value: selectedLevel1.categoryUuid,
              },
            ],
          })
        }
        newSelections.push({
          label: category.categoryName,
          value: category.categoryUuid,
          level: 3,
          ancestors: [
            {
              label: selectedLevel1.categoryName,
              value: selectedLevel1.categoryUuid,
            },
            {
              label: selectedLevel2.categoryName,
              value: selectedLevel2.categoryUuid,
            },
          ],
        })
        setSelectedCategories((prev) => [...prev, ...newSelections])
      }
    }
  }

  // 현재 해당 카테고리가 선택되었는지 여부 체크
  const isSelected = (category: Category) =>
    selectedCategories.some((item) => item.value === category.categoryUuid)

  return (
    <Card>
      <CardHeader>
        <CardTitle>카테고리 선택</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-4'>
        {/* 1차 카테고리 */}
        <Command>
          <CommandInput placeholder='카테고리를 검색해주세요...' />
          <CommandList>
            <CommandEmpty>카테고리가 존재하지 않습니다</CommandEmpty>
            <CommandGroup heading='1차 카테고리'>
              {/* <ScrollArea className='h-40'> */}
              {categories?.map((category: Category) => (
                <CommandItem
                  key={category.categoryUuid}
                  onSelect={() => handleLevel1Click(category)}
                >
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={isSelected(category)}
                      readOnly
                      className='pointer-events-none'
                    />
                    <span>{category.categoryName}</span>
                  </div>
                </CommandItem>
              ))}
              {/* </ScrollArea> */}
            </CommandGroup>
          </CommandList>
        </Command>
        <Separator orientation='vertical' className='h-50' />

        {/* 2차 카테고리 */}
        <Command>
          <CommandInput placeholder='카테고리를 검색해주세요...' />
          <CommandList>
            <CommandEmpty>카테고리가 존재하지 않습니다</CommandEmpty>
            <CommandGroup heading='2차 카테고리'>
              {cate2nd?.map((category: Category) => (
                <CommandItem
                  key={category.categoryUuid}
                  onSelect={() => handleLevel2Click(category)}
                >
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={isSelected(category)}
                      readOnly
                      className='pointer-events-none'
                    />
                    <span>{category.categoryName}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <Separator orientation='vertical' className='h-50' />

        {/* 3차 카테고리 */}
        <Command>
          <CommandInput placeholder='카테고리를 검색해주세요...' />
          <CommandList>
            <CommandEmpty>카테고리가 존재하지 않습니다.</CommandEmpty>
            <CommandGroup heading='3차 카테고리'>
              {cate3rd?.map((category: Category) => (
                <CommandItem
                  key={category.categoryUuid}
                  onSelect={() => handleLevel3Click(category)}
                >
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={isSelected(category)}
                      readOnly
                      className='pointer-events-none'
                    />
                    <span>{category.categoryName}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>

      {/* 선택된 카테고리 목록 */}
      <CardContent>
        <div>
          <h3>선택된 카테고리:</h3>
          <ul className='flex space-x-2'>
            {selectedCategories.map((item) => (
              <li
                key={item.value}
                className='cursor-pointer hover:underline'
                onClick={() => removeSelection(item.value)}
              >
                <Badge>{item.label}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
