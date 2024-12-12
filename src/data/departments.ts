import { Department } from '../types/department';

export const departments: Department[] = [
  {
    id: 'management',
    name: '管理部',
    members: [],
    manager: {
      id: 'A0005',
      name: '李佳芬',
      email: 'manager_management@company.com',
      departmentId: 'management',
      role: 'manager',
    },
  },
  {
    id: 'sales',
    name: '業務部',
    members: [],
    manager: {
      id: 'A0009',
      name: '施博堅',
      email: 'manager_sales@company.com',
      departmentId: 'sales',
      role: 'manager',
    },
  },
  {
    id: 'customer_service',
    name: '客服部',
    members: [],
    manager: {
      id: 'A0015',
      name: '湯敬驊',
      email: 'manager_cs@company.com',
      departmentId: 'customer_service',
      role: 'manager',
    },
  },
  {
    id: 'rd',
    name: '研發部',
    members: [],
    manager: {
      id: 'A0042',
      name: '莊福來',
      email: 'manager_rd@company.com',
      departmentId: 'rd',
      role: 'manager',
    },
  },
  {
    id: 'manufacturing',
    name: '製造部',
    members: [],
    manager: {
      id: 'A0022',
      name: '黃豐裕',
      email: 'manager_manufacturing@company.com',
      departmentId: 'manufacturing',
      role: 'manager',
    },
  },
  {
    id: 'marketing',
    name: '行銷部',
    members: [],
    manager: {
      id: 'A0053',
      name: '蘇千樺',
      email: 'manager_marketing@company.com',
      departmentId: 'marketing',
      role: 'manager',
    },
  },
  {
    id: 'adhesive_lab',
    name: '膠藝所',
    members: [],
    manager: {
      id: 'A0028',
      name: '陳有瑄',
      email: 'manager_lab@company.com',
      departmentId: 'adhesive_lab',
      role: 'manager',
    },
  },
];