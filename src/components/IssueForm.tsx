import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { departments } from '../data/departments';
import { employees } from '../data/employees';
import { useIssueStore } from '../store/issueStore';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

type FormData = {
  description: string;
  type: string;
  priority: string;
  departmentId: string;
  assigneeId: string;
  attachments?: FileList;
};

export const IssueForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const addIssue = useIssueStore(state => state.addIssue);
  const [uploading, setUploading] = useState(false);

  const selectedDepartment = watch('departmentId');

  const departmentEmployees = employees.filter(
    employee => employee.departmentId === selectedDepartment
  );

  const uploadFiles = async (files: FileList): Promise<string[]> => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const storageRef = ref(storage, `attachments/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });
    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setUploading(true);
      const attachments = data.attachments 
        ? await uploadFiles(data.attachments)
        : [];
      
      const now = new Date();
      const dueDate = new Date(now.getTime() + (3 * 60 * 60 * 1000));

      const issue = {
        title: `${data.type} - ${departments.find(d => d.id === data.departmentId)?.name}`,
        description: data.description,
        status: 'pending' as const,
        reporterId: 'current-user-id',
        assignees: [data.assigneeId],
        departmentIds: [data.departmentId],
        priority: data.priority,
        createdAt: now,
        updatedAt: now,
        dueDate,
        attachments,
        comments: [],
      };

      await addIssue(issue);
      navigate('/');
    } catch (error) {
      console.error('Error submitting issue:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-6 text-center">內部異常回報系統</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          描述：
        </label>
        <input
          {...register('description', { required: '請輸入描述' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="網路不通"
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          類型：
        </label>
        <input
          {...register('type', { required: '請輸入類型' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="111"
        />
        {errors.type && (
          <p className="text-red-500 text-xs italic">{errors.type.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          優先級：
        </label>
        <input
          {...register('priority', { required: '請輸入優先級' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="5555555555"
        />
        {errors.priority && (
          <p className="text-red-500 text-xs italic">{errors.priority.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          部門：
        </label>
        <select
          {...register('departmentId', { required: '請選擇部門' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">請選擇部門</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.departmentId && (
          <p className="text-red-500 text-xs italic">{errors.departmentId.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          接收人員：
        </label>
        <select
          {...register('assigneeId', { required: '請選擇接收人員' })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">請選擇接收人員</option>
          {departmentEmployees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name} - {employee.position}
            </option>
          ))}
        </select>
        {errors.assigneeId && (
          <p className="text-red-500 text-xs italic">{errors.assigneeId.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          附件：
        </label>
        <input
          type="file"
          multiple
          {...register('attachments')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={uploading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {uploading ? '提交中...' : '提交'}
        </button>
      </div>
    </form>
  );
};