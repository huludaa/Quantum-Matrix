import request from '@/utils/request'
import type { RoleResponseData, MenuResponseData, RoleData } from './type'
enum API {
  //获取全部的职位接口
  ALLROLE_URL = '/acl/role/',
  //新增岗位的接口地址
  ADDROLE_URL = '/acl/role/save',
  //更新已有的职位
  UPDATEROLE_URL = '/acl/role/update',
  //获取全部的菜单与按钮的数据
  ALLPERMISSTION = '/acl/permission/toAssign/',
  //给相应的职位分配权限
  SETPERMISTION_URL = '/acl/permission/doAssign/?',
  //删除已有的职位
  REMOVEROLE_URL = '/acl/role/remove/',
}

//获取全部的角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
//添加职位与更新已有职位接口
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
//获取全部菜单与按钮权限数据
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSTION + roleId)
//给相应的职位下发权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  request.post(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`)
//删除已有的职位
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId)
