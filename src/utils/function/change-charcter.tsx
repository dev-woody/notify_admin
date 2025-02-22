export function formatText(input: string): string {
  const koreanRegex = /[가-힣]/ // 한글 포함 여부 확인
  const isKorean = koreanRegex.test(input)

  if (isKorean) {
    return input.charAt(0) // 한글이면 첫 글자만 반환
  } else {
    return input.slice(0, 2).toUpperCase() + input.slice(2) // 영어면 첫 두 글자를 대문자로
  }
}

export function changePhone(inputPhone: string | undefined) {
  const firstNum = inputPhone?.substring(0, 3)
  const middleNum = inputPhone?.substring(3, 7)
  const lastNum = inputPhone?.substring(7, 11)
  const fullNum = firstNum + '-' + middleNum + '-' + lastNum
  return inputPhone ? fullNum : ''
}
