import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { contentAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { Save, Lock, Globe, MessageSquare, Info } from 'lucide-react'
import toast from 'react-hot-toast'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('navbar')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { changePassword } = useAuth()

  // Forms for different sections
  const navbarForm = useForm()
  const footerForm = useForm()
  const informasiForm = useForm()
  const saranForm = useForm()
  const passwordForm = useForm()

  useEffect(() => {
    fetchSettingsData()
  }, [])

  const fetchSettingsData = async () => {
    try {
      const [navbarRes, footerRes, informasiRes, saranRes] = await Promise.all([
        contentAPI.getNavbar(),
        contentAPI.getFooter(),
        contentAPI.getInformasi(),
        contentAPI.getSaran()
      ])

      // Set form values
      navbarForm.reset(navbarRes.data.navbar)
      footerForm.reset(footerRes.data.footer)
      informasiForm.reset(informasiRes.data.informasi)
      saranForm.reset(saranRes.data.saran)
    } catch (error) {
      console.error('Error fetching settings data:', error)
      toast.error('Failed to load settings data')
    } finally {
      setLoading(false)
    }
  }

  const handleNavbarSubmit = async (data) => {
    setSaving(true)
    try {
      await contentAPI.updateNavbar(data)
      toast.success('Navbar settings updated successfully')
    } catch (error) {
      console.error('Error updating navbar:', error)
      toast.error('Failed to update navbar settings')
    } finally {
      setSaving(false)
    }
  }

  const handleFooterSubmit = async (data) => {
    setSaving(true)
    try {
      await contentAPI.updateFooter(data)
      toast.success('Footer settings updated successfully')
    } catch (error) {
      console.error('Error updating footer:', error)
      toast.error('Failed to update footer settings')
    } finally {
      setSaving(false)
    }
  }

  const handleInformasiSubmit = async (data) => {
    setSaving(true)
    try {
      await contentAPI.updateInformasi(data)
      toast.success('Information settings updated successfully')
    } catch (error) {
      console.error('Error updating informasi:', error)
      toast.error('Failed to update information settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSaranSubmit = async (data) => {
    setSaving(true)
    try {
      await contentAPI.updateSaran(data)
      toast.success('Suggestion box settings updated successfully')
    } catch (error) {
      console.error('Error updating saran:', error)
      toast.error('Failed to update suggestion box settings')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordSubmit = async (data) => {
    setSaving(true)
    try {
      const result = await changePassword(data.currentPassword, data.newPassword)
      if (result.success) {
        passwordForm.reset()
      }
    } catch (error) {
      console.error('Error changing password:', error)
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'navbar', label: 'Navbar', icon: Globe },
    { id: 'footer', label: 'Footer', icon: Globe },
    { id: 'informasi', label: 'Information', icon: Info },
    { id: 'saran', label: 'Suggestion Box', icon: MessageSquare },
    { id: 'password', label: 'Change Password', icon: Lock },
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage website settings and configurations</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${
                    activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'navbar' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Navbar Settings</h3>
                <p className="card-description">Configure navigation bar content</p>
              </div>
              <form onSubmit={navbarForm.handleSubmit(handleNavbarSubmit)}>
                <div className="card-content space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Title
                      </label>
                      <input
                        {...navbarForm.register('NavbarJudul', { required: true })}
                        className="input"
                        placeholder="SIE 1 KETAQWAAN"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        School Name
                      </label>
                      <input
                        {...navbarForm.register('NavbarSekolah', { required: true })}
                        className="input"
                        placeholder="MAN 1 Jember"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Link
                      </label>
                      <input
                        {...navbarForm.register('NavbarInstagramLink')}
                        className="input"
                        placeholder="https://www.instagram.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        TikTok Link
                      </label>
                      <input
                        {...navbarForm.register('NavbarTiktokLink')}
                        className="input"
                        placeholder="https://www.tiktok.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Copyright Text
                    </label>
                    <input
                      {...navbarForm.register('NavbarCopyRight')}
                      className="input"
                      placeholder="© 2025 SIE 1 KETAQWAAN MAN 1 JEMBER"
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4 mr-2" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Footer Settings</h3>
                <p className="card-description">Configure footer content and contact information</p>
              </div>
              <form onSubmit={footerForm.handleSubmit(handleFooterSubmit)}>
                <div className="card-content space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Description
                    </label>
                    <textarea
                      {...footerForm.register('FooterDeskripsi', { required: true })}
                      rows={3}
                      className="input"
                      placeholder="Sie 1 Ketaqwaan adalah organisasi..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        {...footerForm.register('FooterAlamatJalan', { required: true })}
                        className="input"
                        placeholder="Jl. Imam Bonjol No.50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub-district
                      </label>
                      <input
                        {...footerForm.register('FooterAlamatKecamatan')}
                        className="input"
                        placeholder="Kaliwates Kidul, Kaliwates,"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City/District
                      </label>
                      <input
                        {...footerForm.register('FooterAlamatKota')}
                        className="input"
                        placeholder="Kec. Kaliwates, Kabupaten Jember,"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Province
                      </label>
                      <input
                        {...footerForm.register('FooterAlamatProvinsi')}
                        className="input"
                        placeholder="Jawa Timur 68131."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Message
                    </label>
                    <input
                      {...footerForm.register('FooterNarahubung')}
                      className="input"
                      placeholder="Jika ada eror hubungi Admin yaaa 🤩"
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4 mr-2" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'informasi' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Information Settings</h3>
                <p className="card-description">Configure information section content</p>
              </div>
              <form onSubmit={informasiForm.handleSubmit(handleInformasiSubmit)}>
                <div className="card-content space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Title
                    </label>
                    <input
                      {...informasiForm.register('InformasiJudul', { required: true })}
                      className="input"
                      placeholder="INFORMASI"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      {...informasiForm.register('InformasiDeskripsi', { required: true })}
                      rows={3}
                      className="input"
                      placeholder="Pengumuman tentang siapa saja yang lolos..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Information Link
                    </label>
                    <input
                      {...informasiForm.register('InfomasiLink', { required: true })}
                      type="url"
                      className="input"
                      placeholder="https://lookerstudio.google.com/..."
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4 mr-2" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'saran' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Suggestion Box Settings</h3>
                <p className="card-description">Configure suggestion box section content</p>
              </div>
              <form onSubmit={saranForm.handleSubmit(handleSaranSubmit)}>
                <div className="card-content space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Title
                    </label>
                    <input
                      {...saranForm.register('SaranJudul', { required: true })}
                      className="input"
                      placeholder="Kotak Saran"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Description
                    </label>
                    <textarea
                      {...saranForm.register('SaranDeskripsi', { required: true })}
                      rows={3}
                      className="input"
                      placeholder="Berikan semua kritik, saran, dan apresiasi..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub Description
                    </label>
                    <textarea
                      {...saranForm.register('SaranSubDeskripsi', { required: true })}
                      rows={3}
                      className="input"
                      placeholder="Tenang semua masukan yang anda berikan..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Suggestion Form Link
                    </label>
                    <input
                      {...saranForm.register('SaranLink', { required: true })}
                      type="url"
                      className="input"
                      placeholder="https://kotaksaran-ketaqwaanman1jember.vercel.app/"
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4 mr-2" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Change Password</h3>
                <p className="card-description">Update your account password</p>
              </div>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
                <div className="card-content space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      {...passwordForm.register('currentPassword', { required: 'Current password is required' })}
                      type="password"
                      className="input"
                      placeholder="Enter current password"
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      {...passwordForm.register('newPassword', { 
                        required: 'New password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                      })}
                      type="password"
                      className="input"
                      placeholder="Enter new password"
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      {...passwordForm.register('confirmPassword', { 
                        required: 'Please confirm your new password',
                        validate: value => 
                          value === passwordForm.watch('newPassword') || 'Passwords do not match'
                      })}
                      type="password"
                      className="input"
                      placeholder="Confirm new password"
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="sm" /> : <Lock className="w-4 h-4 mr-2" />}
                    {saving ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings