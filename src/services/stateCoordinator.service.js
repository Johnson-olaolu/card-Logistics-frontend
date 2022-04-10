import axiosService from "./axios.service";


const getAllCompaniesByState = async (query) => {
    return await axiosService.get(`/coordinator/get-all-companies/?state=${query}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const acceptClusterManager = async(clusterManagerId) => {
    return await axiosService.post(`/coordinator/accept-cluster-manager/${clusterManagerId}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const acceptLogisticCompany = async(logisticCompanyId) => {
    return await axiosService.post(`/coordinator/accept-logistic-company/${logisticCompanyId}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const rejectClusterManager = async(clusterManagerId) => {
    return await axiosService.post(`/coordinator/reject-cluster-manager/${clusterManagerId}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const rejectLogisticCompany = async(logisticCompanyId) => {
    return await axiosService.post(`/coordinator/reject-logistic-company/${logisticCompanyId}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const changeClusterManagerPriority = async (payload) => {
    const {clusterManagerId, priority} = payload
    return await axiosService.put(`/coordinator/change-cluster-manager-priority/${clusterManagerId}`, {
        priority
    })
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const changeLogisticsCompanyPriority = async (payload) => {
    const {logisticCompanyId, priority} = payload
    return await axiosService.put(`/coordinator/change-logistic-company-priority/${logisticCompanyId}`, {
        priority
    })
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const mapLogisticsCompany = async (payload) =>{
    const {logisticCompanyId, clusterManagerId} = payload
    return await axiosService.put(`/coordinator/map-logistics-company/${logisticCompanyId}`, {
        clusterManagerId
    })
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}

const mapClusterManager = async (payload) =>{
    const {logisticCompanyId, clusterManagerId} = payload
    return await axiosService.put(`/coordinator/map-cluster-manager/${clusterManagerId}`, {
        logisticsCompanyId : logisticCompanyId
    })
        .then(res => {
            return res.data
        })
        .catch(error => {
            return(error.response.data.message)
        })
}


export const stateCoordinatorSevice = {
    getAllCompaniesByState,
    acceptClusterManager,
    acceptLogisticCompany, 
    rejectClusterManager,
    rejectLogisticCompany,
    changeClusterManagerPriority,
    changeLogisticsCompanyPriority,
    mapLogisticsCompany,
    mapClusterManager
}