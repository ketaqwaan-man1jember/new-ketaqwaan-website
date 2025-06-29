import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { contentAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { Save, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const StructureSection = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [strukturData, setStrukturData] = useState(null)

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      Judul: '',
      JudulDeskripsi: '',
      JudulPengurus: '',
      TahunKepengurusan: '',
      BaganStukturKorbid: '',
      BaganStukturKetua: '',
      BaganStukturSekretaris: '',
      BaganStukturBendahara: '',
      members: []
    }
  })

  const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({
    control,
    name: 'members'
  })

  useEffect(() => {
    fetchStrukturData()
  }, [])

  const fetchStrukturData = async () => {
    try {
      const response = await contentAPI.getStructureSection()
      const data = response.data.struktur
      setStrukturData(data)
      
      // Set form values
      Object.keys(data).forEach(key => {
        if (key !==  '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'updatedBy' && key !== 'isActive') {
          setValue(key, data[key])
        }
      })
    } catch (error) {
      console.error('Error fetching struktur data:', error)
      toast.error('Failed to load structure section data')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      if (strukturData?._id) {
        await contentAPI.updateStructureSection(strukturData._id, data)
        toast.success('Structure section updated successfully')
      } else {
        await contentAPI.createStructureSection(data)
        toast.success('Structure section created successfully')
      }
      fetchStrukturData()
    } catch (error) {
      console.error('Error saving struktur data:', error)
      toast.error('Failed to save structure section')
    } finally {
      setSaving(false)
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
          <h1 className="text-2xl font-bold text-gray-900">Structure Section</h1>
          <p className="text-gray-600">Manage organizational structure information</p>
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
            <p className="card-description">General information about the organizational structure</p>
          </div>
          <div className="card-content space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  {...register('Judul', { required: 'Title is required' })}
                  className="input"
                  placeholder="e.g., Struktur Organisasi"
                />
                {errors.Judul && (
                  <p className="text-red-500 text-sm mt-1">{errors.Judul.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <input
                  {...register('TahunKepengurusan', { required: 'Period is required' })}
                  className="input"
                  placeholder="e.g., Periode 2024/2025"
                />
                {errors.TahunKepengurusan && (
                  <p className="text-red-500 text-sm mt-1">{errors.TahunKepengurusan.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('JudulDeskripsi', { required: 'Description is required' })}
                rows={3}
                className="input"
                placeholder="Description of the organizational structure"
              />
              {errors.JudulDeskripsi && (
                <p className="text-red-500 text-sm mt-1">{errors.JudulDeskripsi.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board Title
              </label>
              <input
                {...register('JudulPengurus', { required: 'Board title is required' })}
                className="input"
                placeholder="e.g., Susunan Pengurus"
              />
              {errors.JudulPengurus && (
                <p className="text-red-500 text-sm mt-1">{errors.JudulPengurus.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Position Labels */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Position Labels</h3>
            <p className="card-description">Labels for different positions in the organizational chart</p>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coordinator Label
                </label>
                <input
                  {...register('BaganStukturKorbid')}
                  className="input"
                  placeholder="e.g., Koordinator Bidang"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chairman Label
                </label>
                <input
                  {...register('BaganStukturKetua')}
                  className="input"
                  placeholder="e.g., Ketua"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secretary Label
                </label>
                <input
                  {...register('BaganStukturSekretaris')}
                  className="input"
                  placeholder="e.g., Sekretaris"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treasurer Label
                </label>
                <input
                  {...register('BaganStukturBendahara')}
                  className="input"
                  placeholder="e.g., Bendahara"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title">Organization Members</h3>
                <p className="card-description">List of all organization members with their positions</p>
              </div>
              <button
                type="button"
                onClick={() => appendMember('')}
                className="btn btn-outline btn-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {memberFields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      {...register(`members.${index}`, { required: 'Member information is required' })}
                      className="input"
                      placeholder="e.g., Koordinator Bidang: Laqia"
                    />
                    {errors.members?.[index] && (
                      <p className="text-red-500 text-sm mt-1">{errors.members[index].message}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {memberFields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No members added yet. Click "Add Member" to start.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Member Format Guidelines</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Use format: "Position: Name" (e.g., "Ketua: Habibi")</p>
            <p>• For coordinators: "Koordinator sie [Division]: Name" (e.g., "Koordinator sie Humas: Rama")</p>
            <p>• For extracurriculars: "Koordinator ekskul [Activity]: Name" (e.g., "Koordinator ekskul Hadrah: Rama")</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default StructureSection