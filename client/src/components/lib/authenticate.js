export const isAdminAuthenticated = () => {
  const admin = localStorage.getItem('admin')

  if(admin.token)
    return true
  else
    return false
}
