import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { contentAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ImageUpload from '../components/ImageUpload'
import { Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const HeroSection = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroData, setHeroData] = useState(null)

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      HeroLogoSie1: '',
      HeroDeskripsiLogoSie1: '',
      HeroWelcomeText: '',
      HeroPrimaryText: '',
      HeroSecondaryText: '',
      HeroDescription: '',
      HeroInforSie1: [
        { HeroTotalProker: 0, HeroDeskripsiProker: '' },
        { HeroTotalEkskul: 0, HeroDeskripsiEkskul: '' },
        { HeroTotalAnggota: 0, HeroDeskripsiAnggota: '' }
      ],
      cta: [
        { text: '', link: '', icon: '', type: 'primary' },
        { text: '', link: '', icon: '', type: 'secondary' }
      ],
      slides: []
    }
  })

  const { fields: ctaFields, append: appendCta, remove: removeCta } = useFieldArray({
    control,
    name: 'cta'
  })

  const { fields: slideFields, append: appendSlide, remove: removeSlide } = useFieldArray({
    control,
    name: 'slides'
  })

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const response = await contentAPI.getHeroSection()
      const data = response.data.heroSection
      setHeroData(data)
      
      // Set form values
      Object.keys(data).forEach(key => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'updatedBy' && key !== 'isActive') {
          setValue(key, data[key])
        }
      })
    } catch (error) {
      console.error('Error fetching hero data:', error)
      toast.error('Failed to load hero section data')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      if (heroData?._id) {
        await contentAPI.updateHeroSection(heroData._id, data)
        toast.success('Hero section updated successfully')
      } else {
        await contentAPI.createHeroSection(data)
        toast.success('Hero section created successfully')
      }
      fetchHeroData()
    } catch (error) {
      console.error('Error saving hero data:', error)
      toast.error('Failed to save hero section')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (formData, field) => {
    try {
      const response = await contentAPI.uploadHeroImage(formData)
      setValue(field, response.data.imageUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    }
  }

  const handleSlideImageUpload = async (formData, index) => {
    try {
      const response = await contentAPI.uploadHeroImage(formData)
      setValue(`slides.${index}.image`, response.data.imageUrl)
      toast.success('Slide image uploaded successfully')
    } catch (error) {
      console.error('Error uploading slide image:', error)
      toast.error('Failed to upload slide image')
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
          <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-gray-600">Manage the main hero section of your website</p>
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
            <p className="card-description">Main content and text for the hero section</p>
          </div>
          <div className="card-content space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Welcome Text
                </label>
                <input
                  {...register('HeroWelcomeText', { required: 'Welcome text is required' })}
                  className="input"
                  placeholder="e.g., Selamat Datang di"
                />
                {errors.HeroWelcomeText && (
                  <p className="text-red-500 text-sm mt-1">{errors.HeroWelcomeText.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Description
                </label>
                <input
                  {...register('HeroDeskripsiLogoSie1', { required: 'Logo description is required' })}
                  className="input"
                  placeholder="Logo description"
                />
                {errors.HeroDeskripsiLogoSie1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.HeroDeskripsiLogoSie1.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Text
                </label>
                <input
                  {...register('HeroPrimaryText', { required: 'Primary text is required' })}
                  className="input"
                  placeholder="e.g., SIE 1 KETAQWAAN"
                />
                {errors.HeroPrimaryText && (
                  <p className="text-red-500 text-sm mt-1">{errors.HeroPrimaryText.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Text
                </label>
                <input
                  {...register('HeroSecondaryText', { required: 'Secondary text is required' })}
                  className="input"
                  placeholder="e.g., MAN 1 JEMBER"
                />
                {errors.HeroSecondaryText && (
                  <p className="text-red-500 text-sm mt-1">{errors.HeroSecondaryText.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('HeroDescription', { required: 'Description is required' })}
                rows={3}
                className="input"
                placeholder="Hero section description"
              />
              {errors.HeroDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.HeroDescription.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Image
              </label>
              <ImageUpload
                currentImage={watch('HeroLogoSie1')}
                onUpload={(formData) => handleImageUpload(formData, 'HeroLogoSie1')}
                onRemove={() => setValue('HeroLogoSie1', '')}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Statistics</h3>
            <p className="card-description">Display key numbers and statistics</p>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Program Kerja</label>
                <input
                  {...register('HeroInforSie1.0.HeroTotalProker', { valueAsNumber: true })}
                  type="number"
                  className="input"
                  placeholder="20"
                />
                <input
                  {...register('HeroInforSie1.0.HeroDeskripsiProker')}
                  className="input"
                  placeholder="Program Kerja"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Ekstrakurikuler</label>
                <input
                  {...register('HeroInforSie1.1.HeroTotalEkskul', { valueAsNumber: true })}
                  type="number"
                  className="input"
                  placeholder="3"
                />
                <input
                  {...register('HeroInforSie1.1.HeroDeskripsiEkskul')}
                  className="input"
                  placeholder="Ekstrakurikuler"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Anggota</label>
                <input
                  {...register('HeroInforSie1.2.HeroTotalAnggota', { valueAsNumber: true })}
                  type="number"
                  className="input"
                  placeholder="100"
                />
                <input
                  {...register('HeroInforSie1.2.HeroDeskripsiAnggota')}
                  className="input"
                  placeholder="Anggota"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title">Call to Action Buttons</h3>
                <p className="card-description">Action buttons in the hero section</p>
              </div>
              <button
                type="button"
                onClick={() => appendCta({ text: '', link: '', icon: '', type: 'primary' })}
                className="btn btn-outline btn-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Button
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {ctaFields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Button {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeCta(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      {...register(`cta.${index}.text`)}
                      className="input"
                      placeholder="Button text"
                    />
                    <input
                      {...register(`cta.${index}.link`)}
                      className="input"
                      placeholder="Button link"
                    />
                    <input
                      {...register(`cta.${index}.icon`)}
                      className="input"
                      placeholder="Icon class (e.g., fas fa-arrow-right)"
                    />
                    <select
                      {...register(`cta.${index}.type`)}
                      className="input"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slides */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title">Hero Slides</h3>
                <p className="card-description">Image carousel slides</p>
              </div>
              <button
                type="button"
                onClick={() => appendSlide({ id: Date.now(), image: '', title: '', description: '' })}
                className="btn btn-outline btn-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Slide
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-6">
              {slideFields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Slide {index + 1}</h4>
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
                      <input
                        {...register(`slides.${index}.id`, { valueAsNumber: true })}
                        type="number"
                        className="input"
                        placeholder="Slide ID"
                      />
                      <input
                        {...register(`slides.${index}.title`)}
                        className="input"
                        placeholder="Slide title"
                      />
                      <textarea
                        {...register(`slides.${index}.description`)}
                        rows={3}
                        className="input"
                        placeholder="Slide description"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slide Image
                      </label>
                      <ImageUpload
                        currentImage={watch(`slides.${index}.image`)}
                        onUpload={(formData) => handleSlideImageUpload(formData, index)}
                        onRemove={() => setValue(`slides.${index}.image`, '')}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HeroSection