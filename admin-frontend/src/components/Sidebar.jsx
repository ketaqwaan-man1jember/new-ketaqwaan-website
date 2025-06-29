import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  GraduationCap, 
  Settings, 
  LogOut,
  X,
  LayoutDashboard,
  UserCheck
} from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Hero Section', href: '/hero-section', icon: Home },
  { name: 'Structure', href: '/structure', icon: UserCheck },
  { name: 'Program Kerja', href: '/program-kerja', icon: FileText },
  { name: 'Kegiatan', href: '/kegiatan', icon: Calendar },
  { name: 'Ekstrakurikuler', href: '/ekskul', icon: GraduationCap },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const Sidebar = ({ open, setOpen }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">Ketaqwaan</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon className={clsx(
                    'w-5 h-5 mr-3',
                    isActive ? 'text-primary-600' : 'text-gray-400'
                  )} />
                  {item.name}
                </NavLink>
              )
            })}

            {/* Users link for super admin only */}
            {user?.role === 'super_admin' && (
              <NavLink
                to="/users"
                className={clsx(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  location.pathname === '/users'
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                onClick={() => setOpen(false)}
              >
                <Users className={clsx(
                  'w-5 h-5 mr-3',
                  location.pathname === '/users' ? 'text-primary-600' : 'text-gray-400'
                )} />
                Users
              </NavLink>
            )}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar