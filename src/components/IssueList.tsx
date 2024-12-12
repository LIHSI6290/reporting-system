import React from 'react';
import { Link } from 'react-router-dom';
import { Issue } from '../types/department';
import { format } from 'date-fns';

type IssueListProps = {
  issues: Issue[];
};

export const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link
          to="/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          新增問題回報
        </Link>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        {issues.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            目前沒有任何問題回報
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-200">
            {issues.map((issue) => (
              <li key={issue.id}>
                <Link to={`/issues/${issue.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {issue.title}
                      </p>
                      <div className="ml-2 flex flex-shrink-0">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          issue.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {issue.status === 'pending' ? '等待處理' :
                           issue.status === 'in_review' ? '審核中' :
                           issue.status === 'need_info' ? '需要更多資訊' :
                           issue.status === 'in_progress' ? '處理中' :
                           issue.status === 'resolved' ? '已解決' :
                           '已結案'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          建立時間: {format(new Date(issue.createdAt), 'yyyy-MM-dd HH:mm')}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          處理期限: {format(new Date(issue.dueDate), 'yyyy-MM-dd HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};