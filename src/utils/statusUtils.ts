import { IssueStatus } from '../types/department';

export const getStatusColor = (status: IssueStatus): string => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-purple-100 text-purple-800',
    need_info: 'bg-orange-100 text-orange-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || colors.pending;
};

export const getStatusText = (status: IssueStatus): string => {
  const texts = {
    pending: '等待處理',
    in_review: '審核中',
    need_info: '需要更多資訊',
    in_progress: '處理中',
    resolved: '已解決',
    closed: '已結案',
  };
  return texts[status] || texts.pending;
};