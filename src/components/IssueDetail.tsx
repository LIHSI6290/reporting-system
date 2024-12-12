import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Issue } from '../types/department';
import { getStatusColor, getStatusText } from '../utils/statusUtils';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const IssueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'issues', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIssue({ id: docSnap.id, ...docSnap.data() } as Issue);
        }
      } catch (error) {
        console.error('Error fetching issue:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">載入中...</div>;
  }

  if (!issue) {
    return <div className="text-center py-8">找不到此問題</div>;
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {issue.title}
          </h3>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(issue.status)}`}>
            {getStatusText(issue.status)}
          </span>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">描述</dt>
            <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{issue.description}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">建立時間</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(issue.createdAt), 'yyyy-MM-dd HH:mm')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">處理期限</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(issue.dueDate), 'yyyy-MM-dd HH:mm')}
            </dd>
          </div>
          {issue.attachments.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">附件</dt>
              <dd className="mt-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {issue.attachments.map((url, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">附件 {index + 1}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          下載
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};