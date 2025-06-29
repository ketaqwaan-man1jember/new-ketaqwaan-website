import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { contentAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { Save, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const ProgramKerja = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [programData, setProgramData] = useState(null)

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      ProgramKerjaJudul: '',
      ProgramKerjaDeskripsi: '',
      programs: []
    }
  })

  const { fields: programFields, append: appendProgram, remove: removeProgram } = useFieldArray({
    control,
    name: 'programs'
  })

  useEffect(() => {
    fetchProgramData()
  }, [])

  const fetchProgramData = async () => {
    try {
      const response = await contentAPI.getProgramKerja()
      const data = response.data.programKerja
      setProgramData(data)
      
      // Set form values
      Object.keys(data).forEach(key => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'updatedBy' && key !== 'isActive') {
          setValue(key, data[key])
        }
      })
    } catch (error) {
      console.error('Error fetching program data:', error)
      toast.error('Failed to load program kerja data')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      if (programData?._id) {
        await contentAPI.updateProgramKerja(programData._id, data)
        toast.success('Program kerja updated successfully')
      } else {
        await contentAPI.createProgramKerja(data)
        toast.success('Program kerja created successfully')
      }
      fetchProgramData()
    } catch (error) {
      console.error('Error saving program data:', error)
      toast.error('Failed to save program kerja')
    } finally {
      setSaving(false)
    }
  }

  const statusOptions = [
    { value: 'Selesai', label: 'Selesai' },
    { value: 'Sedang-Berlangsung', label: 'Sedang Berlangsung' },
    { value: 'Direncanakan', label: 'Direncanakan' }
  ]

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
          <h1 className="text-2xl font-bold text-gray-900">Program Kerja</h1>
          <p className="text-gray-600">Manage work programs and activities</p>
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
            <p className="card-description">General information about the work programs section</p>
          </div>
          <div className="card-content space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                {...register('ProgramKerjaJudul', { required: 'Title is required' })}
                className="input"
                placeholder="e.g., Program Kerja"
              />
              {errors.ProgramKerjaJudul && (
                <p className="text-red-500 text-sm mt-1">{errors.ProgramKerjaJudul.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                {...register('ProgramKerjaDeskripsi', { required: 'Description is required' })}
                rows={3}
                className="input"
                placeholder="Description of the work programs section"
              />
              {errors.ProgramKerjaDeskripsi && (
                <p className="text-red-500 text-sm mt-1">{errors.ProgramKerjaDeskripsi.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title">Work Programs</h3>
                <p className="card-description">List of all work programs and activities</p>
              </div>
              <button
                type="button"
                onClick={() => appendProgram({
                  icon: '',
                  title: '',
                  description: '',
                  date: '',
                  status: 'Direncanakan'
                })}
                className="btn btn-outline btn-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Program
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-6">
              {programFields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Program {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeProgram(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon Class
                      </label>
                      <input
                        {...register(`programs.${index}.icon`, { required: 'Icon is required' })}
                        className="input"
                        placeholder="e.g., fas fa-mosque"
                      />
                      {errors.programs?.[index]?.icon && (
                        <p className="text-red-500 text-sm mt-1">{errors.programs[index].icon.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        {...register(`programs.${index}.status`, { required: 'Status is required' })}
                        className="input"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.programs?.[index]?.status && (
                        <p className="text-red-500 text-sm mt-1">{errors.programs[index].status.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Program Title
                      </label>
                      <input
                        {...register(`programs.${index}.title`, { required: 'Title is required' })}
                        className="input"
                        placeholder="Program title"
                      />
                      {errors.programs?.[index]?.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.programs[index].title.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        {...register(`programs.${index}.description`, { required: 'Description is required' })}
                        rows={3}
                        className="input"
                        placeholder="Program description"
                      />
                      {errors.programs?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.programs[index].description.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date/Schedule
                      </label>
                      <input
                        {...register(`programs.${index}.date`, { required: 'Date is required' })}
                        className="input"
                        placeholder="e.g., Sabtu, 21 Oktober 2023 or Setiap Sabtu"
                      />
                      {errors.programs?.[index]?.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.programs[index].date.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {programFields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No programs added yet. Click "Add Program" to start.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Icon Guidelines</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Use FontAwesome icon classes (e.g., "fas fa-mosque", "fas fa-calendar-alt")</p>
            <p>• You can find icons at: <a href="https://fontawesome.com/icons" target="_blank" rel="noopener noreferrer" className="underline">fontawesome.com/icons</a></p>
            <p>• Common icons: fas fa-mosque, fas fa-star-and-crescent, fas fa-music, fas fa-book, fas fa-users</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProgramKerja