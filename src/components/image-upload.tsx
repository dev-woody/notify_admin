import { useState } from 'react'
// import { useImageUpload } from '@/queries/common/useImageQuery'
import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ImageUploadProps {
  imageType: string
  previewType?: 'text' | 'image'
  setImageList: (imageUuid: string) => void
  multiple?: boolean
}

interface UploadedImage {
  uuid: string
  url: string
  name: string
}

export default function ImageUpload({
  imageType,
  previewType = 'text',
  setImageList,
  multiple = false,
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  // const { mutate: uploadImage } = useImageUpload()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    // if (files) {
    //   for (let i = 0; i < files.length; i++) {
    //     uploadImage(
    //       { file: files[i], imageType },
    //       {
    //         onSuccess: (response) => {
    //           const data = response.data
    //           setUploadedImages((prev) => [
    //             ...prev,
    //             {
    //               uuid: data.imageUuid,
    //               url: data.imageUrl,
    //               name: data.imageName,
    //             },
    //           ])

    //           setImageList(data.imageUuid)

    //           toast({
    //             title: '업로드 성공',
    //             description: `${data.imageName} 업로드되었습니다.`,
    //           })
    //         },
    //         onError: () => {
    //           toast({
    //             title: '업로드 실패',
    //             description: '이미지 업로드 중 오류가 발생했습니다.',
    //             variant: 'destructive',
    //           })
    //         },
    //       }
    //     )
    //   }
    // }
  }

  const handleRemoveImage = (uuid: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.uuid !== uuid))
  }

  return (
    <div className='w-full'>
      <Input
        type='file'
        accept='image/*'
        multiple={multiple}
        onChange={handleImageChange}
        className='hidden'
        id={`${imageType}-upload`}
      />
      {(multiple || uploadedImages.length < 1) && (
        <label htmlFor={`${imageType}-upload`}>
          <Button variant='outline' className='w-full' asChild>
            <span className='cursor-pointer'>
              <Plus className='w-4 h-4 mr-2' /> 이미지 추가
            </span>
          </Button>
        </label>
      )}

      {uploadedImages.length > 0 && (
        <div
          className={cn(
            'mt-4 grid gap-2',
            previewType === 'text' ? 'grid-cols-1 h-[36]' : 'grid-cols-3'
          )}
        >
          {uploadedImages.map((img) => (
            <div
              key={img.uuid}
              className={cn(
                'relative border rounded overflow-hidden w-full',
                previewType === 'text' ? 'h-10' : 'aspect-square'
              )}
            >
              {previewType === 'image' ? (
                <img
                  src={img.url}
                  alt={img.name}
                  className='object-cover w-full h-full'
                />
              ) : (
                <div className='flex items-center justify-center text-center p-2'>
                  <span className='text-sm'>{img.name}</span>
                </div>
              )}
              <Button
                type='button'
                size='icon'
                variant='ghost'
                className='absolute top-1 right-1 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full'
                onClick={() => handleRemoveImage(img.uuid)}
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
