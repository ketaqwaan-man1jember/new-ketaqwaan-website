import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { contentAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ImageUpload from '../components/ImageUpload'
import { Save, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const Ekskul = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [ekskulData, setEkskulData] = useState(null)

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      EkskulJudul: '',
      EkskulDeskripsi: '',
      EkskulSlide: []
    }
  })

  const { fields: slideFields, append: appendSlide, remove: removeSlide } = useFieldArray({
    control,
    name: 'EkskulSlide'
  })

  useEffect(() => {
    fetchEkskulData()
  }, [])

  const fetchEkskulData = async () => {
    try {
      const response = await contentAPI.getEkskul()
      const data = response.data.ekskul
      setEkskulData(data)
      
      // Set form values
      Object.keys(data).forEach(key => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'updatedBy' && key !== 'isActive') {
          setValue(key, data[key])
        }
      })
    } catch (error) {
      console.error('Error fetching ekskul data:', error)
      toast.error('Failed to load ekstrakurikuler data')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      if (ekskulData?._id) {
        await contentAPI.updateEkskul(ekskulData._id, data)
        toast.success('Ekstrakurikuler updated successfully')
      } else {
        await contentAPI.createEkskul(data)
        toast.success('Ekstrakurikuler created successfully')
      }
      fetchEkskulData()
    } catch (error) {
      console.error('Error saving ekskul data:', error)
      toast.error('Failed to save ekstrakurikuler')
    } finally {
      setSaving(false)
    }
  }

  const handleSlideImageUpload = async (formData, index) => {
    try {
      const response = await contentAPI.uploadEkskulImage(formData)
      setValue(`EkskulSlide.${index}.image`, response.data.imageUrl)
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
          <h1 className="text-2xl font-bold text-gray-900">Ekstrakurikuler</h1>
          <p className="text-gray-600">Manage extracurricular activities</p>
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
            <p className="card-description">General information about the extracurricular section</p>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                {...register('EkskulJudul', { required: 'Title is required' })}
                className="input"
                placeholder="e.g., Ekstrakurikuler"
              />
              {errors.EkskulJudul && (
                <p className="text-red-500 text-sm mt-1">{errors.EkskulJudul.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                {...register('EkskulDeskripsi', { required: 'Description is required' })}
                rows={3}
                className="input"
                placeholder="Description of the extracurricular section"
              />
              {errors.EkskulDeskripsi && (
                <p className="text-red-500 text-sm mt-1">{errors.EkskulDeskripsi.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Extracurricular Slides */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title">Extracurricular Activities</h3>
                <p className="card-description">List of extracurricular activities with schedules</p>
              </div>
              <button
                type="button"
                onClick={() => appendSlide({
                  title: '',
                  description: '',
                  image: '',
                  schedule: {
                    day: '',
                    time: ''
                  }
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
                          {...register(`EkskulSlide.${index}.title`, { required: 'Title is required' })}
                          className="input"
                          placeholder="e.g., Tilawah"
                        />
                        {errors.EkskulSlide?.[index]?.title && (
                          <p className="text-red-500 text-sm mt-1">{errors.EkskulSlide[index].title.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          {...register(`EkskulSlide.${index}.description`, { required: 'Description is required' })}
                          rows={4}
                          className="input"
                          placeholder="Activity description"
                        />
                        {errors.EkskulSlide?.[index]?.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.EkskulSlide[index].description.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Schedule Day
                          </label>
                          <input
                            {...register(`EkskulSlide.${index}.schedule.day`, { required: 'Day is required' })}
                            className="input"
                            placeholder="e.g., Setiap Sabtu"
                          />
                          {errors.EkskulSlide?.[index]?.schedule?.day && (
                            <p className="text-red-500 text-sm mt-1">{errors.EkskulSlide[index].schedule.day.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Schedule Time
                          </label>
                          <input
                            {...register(`EkskulSlide.${index}.schedule.time`, { required: 'Time is required' })}
                            className="input"
                            placeholder="e.g., 13.00 - Selesai"
                          />
                          {errors.EkskulSlide?.[index]?.schedule?.time && (
                            <p className="text-red-500 text-sm mt-1">{errors.EkskulSlide[index].schedule.time.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activity Image
                      </label>
                      <ImageUpload
                        currentImage={watch(`EkskulSlide.${index}.image`)}
                        onUpload={(formData) => handleSlideImageUpload(formData, index)}
                        onRemove={() => setValue(`EkskulSlide.${index}.image`, '')}
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
            <p>• Use clear, descriptive titles for each extracurricular activity</p>
            <p>• Include detailed descriptions of what students will learn or do</p>
            <p>• Specify the day and time clearly (e.g., "Setiap Sabtu", "13.00 - Selesai")</p>
            <p>• Upload representative images that showcase the activity</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Ekskul