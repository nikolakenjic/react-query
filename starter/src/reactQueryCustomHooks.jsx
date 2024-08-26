import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import fetchUrl from './utils';
import { toast } from 'react-toastify';

// Fetch Tasks
export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['tasks'],
    // with nested data.data
    // queryFn: () => fetchUrl.get('/'),
    // Without nested data
    queryFn: async () => {
      const { data } = await fetchUrl.get('/');
      return data;
    },
  });

  return { isLoading, data, isError };
};

// Create Task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => fetchUrl.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Successfully added task');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { createTask, isLoading };
};

// Edit Task
export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return fetchUrl.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { editTask };
};

// Delete Task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading: isDeleteLoading } = useMutation({
    mutationFn: (taskId) => {
      return fetchUrl.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { deleteTask, isDeleteLoading };
};
