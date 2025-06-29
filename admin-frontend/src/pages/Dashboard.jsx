import { useState, useEffect } from 'react'
import { 
  Users, 
  FileText, 
  Calendar, 
  GraduationCap,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react'
import { contentAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalKegiatan: 0,
    totalEkskul: 0,
    lastUpdated: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [programRes, kegiatanRes, ekskulRes] = await Promise.all([
        contentAPI.getProgramKerja().catch(() => ({ data: { programKerja: { programs: [] } } })),
        contentAPI.getKegiatan().catch(() => ({ data: { kegiatan: { KegiatanSlide: [] } } })),
        contentAPI.getEkskul().catch(() => ({ data: { ekskul: { EkskulSlide: [] } } }))
      ])

      setStats({
        totalPrograms: programRes.data.programKerja?.programs?.length || 0,
        totalKegiatan: kegiatanRes.data.kegiatan?.KegiatanSlide?.length || 0,
        totalEkskul: ekskulRes.data.ekskul?.EkskulSlide?.length || 0,
        lastUpdated: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Program Kerja',
      value: stats.totalPrograms,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Kegiatan',
      value: stats.totalKegiatan,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Total Ekstrakurikuler',
      value: stats.totalEkskul,
      icon: GraduationCap,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Active Users',
      value: 1,
      icon: Users,
      color: 'bg-orange-500',
      change: '0%'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'Updated Hero Section',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      action: 'Added new Program Kerja',
      time: '5 hours ago',
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      id: 3,
      action: 'Modified Structure Section',
      time: '1 day ago',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      id: 4,
      action: 'Updated Kegiatan images',
      time: '2 days ago',
      icon: Calendar,
      color: 'text-orange-500'
    }
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Ketaqwaan Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Add Program</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Add Kegiatan</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <GraduationCap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Add Ekskul</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Manage Users</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Database: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">API: Operational</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Storage: Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard