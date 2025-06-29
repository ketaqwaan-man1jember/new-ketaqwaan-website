import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { contentAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ImageUpload from '../components/ImageUpload'
import { Save, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const Kegiatan = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [kegiatanData, setKegiatanData] = useState(null)

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      KegiatanJudul: '',
      KegiatanDeskripsi: '',
      KegiatanSlide: []
    }
  })

  const { fields: slideFields, append: appendSlide, remove: removeSlide } = useFieldArray({
    control,
    name: 'KegiatanSlide'
  })

  useEffect(() => {
    fetchKegiatanData()
  }, [])

  const fetchKegiatanData = async () => {
    try {
      const response = await contentAPI.getKegiatan()
      const data = response.data.kegiatan
      setKegiatanData(data)
      
      // Set form values
      Object.keys(data).forEach(key => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'updatedBy' && key !== 'isActive') {
          setValue(key, data[key])
        }
      })
    } catch (error) {
      console.error('Error fetching kegiatan data:', error)
      toast.error('Failed to load kegiatan data')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      if (kegiatanData?._id) {
        await contentAPI.updateKegiatan(kegiatanData._id, data)
        toast.success('Kegiatan updated successfully')
      } else {
        await contentAPI.createKegiatan(data)
        toast.success('Kegiatan created successfully')
      }
      fetchKegiatanData()
    } catch (error) {
      console.error('Error saving kegiatan data:', error)
      toast.error('Failed to save kegiatan')
    } finally {
      setSaving(false)
    }
  }

  const handleSlideImageUpload = async (formData, index) => {
    try {
      const response = await contentAPI.uploadKegiatanImage(formData)
      setValue(`KegiatanSlide.${index}.image`, response.data.imageUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kegiatan PHBI</h1>
          <p className="text-gray-600">Manage Islamic religious activities and events</p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Basic Information</h3>
            <p className="card-description">General information about the activities section</p>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                {...register('KegiatanJudul', { required: 'Title is required' })}
                className="input"
                placeholder="e.g., Peringatan Hari Besar Islam"
              />
              {errors.KegiatanJudul && (
                <p className="text-red-500 text-sm mt-1">{errors.KegiatanJudul.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                {...register('KegiatanDeskripsi', { required: 'Description is required' })}
                rows={3}
                className="input"
                placeholder="Description of the activities section"
              />
              {errors.KegiatanDeskripsi && (
                <p className="text-red-500 text-sm mt-1">{errors.KegiatanDeskripsi.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Activity Slides */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title">Activity Slides</h3>
                <p className="card-description">Religious activities and events with images</p>
              </div>
              <button
                type="button"
                onClick={() => appendSlide({
                  title: '',
                  description: '',
                  image: '',
                  date: ''
                })}
                className="btn btn-outline btn-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-6">
              {slideFields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Activity {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeSlide(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Activity Title
                        </label>
                        <input
                          {...register(`KegiatanSlide.${index}.title`, { required: 'Title is required' })}
                          className="input"
                          placeholder="Activity title"
                        />
                        {errors.KegiatanSlide?.[index]?.title && (
                          <p className="text-red-500 text-sm mt-1">{errors.KegiatanSlide[index].title.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          {...register(`KegiatanSlide.${index}.date`, { required: 'Date is required' })}
                          className="input"
                          placeholder="e.g., Sabtu, 21 Oktober 2023"
                        />
                        {errors.KegiatanSlide?.[index]?.date && (
                          <p className="text-red-500 text-sm mt-1">{errors.KegiatanSlide[index].date.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          {...register(`KegiatanSlide.${index}.description`, { required: 'Description is required' })}
                          rows={4}
                          className="input"
                          placeholder="Activity description"
                        />
                        {errors.KegiatanSlide?.[index]?.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.KegiatanSlide[index].description.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activity Image
                      </label>
                      <ImageUpload
                        currentImage={watch(`KegiatanSlide.${index}.image`)}
                        onUpload={(formData) => handleSlideImageUpload(formData, index)}
                        onRemove={() => setValue(`KegiatanSlide.${index}.image`, '')}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {slideFields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No activities added yet. Click "Add Activity" to start.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Activity Guidelines</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Use clear, descriptive titles for each activity</p>
            <p>• Include the full date in Indonesian format (e.g., "Sabtu, 21 Oktober 2023")</p>
            <p>• Write meaningful descriptions that explain the significance of the activity</p>
            <p>• Upload high-quality images that represent the activity well</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Kegiatan