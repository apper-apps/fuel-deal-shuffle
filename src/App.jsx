import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import DealManagement from '@/components/pages/DealManagement'
import UserProfile from '@/components/pages/UserProfile'
import UserFavorites from '@/components/pages/UserFavorites'
import RecentlyViewed from '@/components/pages/RecentlyViewed'

function App() {
  return (
    <div className="App">
<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user/*" element={
            <Routes>
              <Route index element={<DealManagement />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="favorites" element={<UserFavorites />} />
              <Route path="recently-viewed" element={<RecentlyViewed />} />
            </Routes>
          } />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App