import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let status = "Customer"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles, id } = decoded.UserInfo

        isManager = roles.includes('Manager')

        if (isManager) status = "Manager"

        return { username, roles, status, isManager, id }
    }

    return { username: '', roles: [], isManager, status }
}
export default useAuth