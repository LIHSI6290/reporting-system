import { create } from 'zustand';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Issue, IssueStatus } from '../types/department';

interface IssueStore {
  issues: Issue[];
  loading: boolean;
  fetchIssues: () => Promise<void>;
  addIssue: (issue: Omit<Issue, 'id'>) => Promise<string>;
  updateIssueStatus: (id: string, status: IssueStatus) => Promise<void>;
}

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: [],
  loading: false,

  fetchIssues: async () => {
    set({ loading: true });
    try {
      const querySnapshot = await getDocs(collection(db, 'issues'));
      const issues = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Issue[];
      set({ issues });
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      set({ loading: false });
    }
  },

  addIssue: async (issue) => {
    try {
      const docRef = await addDoc(collection(db, 'issues'), issue);
      await get().fetchIssues();
      return docRef.id;
    } catch (error) {
      console.error('Error adding issue:', error);
      throw error;
    }
  },

  updateIssueStatus: async (id: string, status: IssueStatus) => {
    try {
      const issueRef = doc(db, 'issues', id);
      await updateDoc(issueRef, { status });
      await get().fetchIssues();
    } catch (error) {
      console.error('Error updating issue status:', error);
      throw error;
    }
  },
}));