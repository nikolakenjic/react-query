import SingleItem from './SingleItem';
import { useFetchTasks } from './reactQueryCustomHooks';

const Items = () => {
  const { data, isError, isLoading } = useFetchTasks();

  // const taskList = data?.data?.taskList || [];
  const taskList = data?.taskList || [];

  if (isLoading)
    return <p style={{ marginTop: '2rem', textAlign: 'center' }}>Loading...</p>;

  if (isError)
    return (
      <p style={{ marginTop: '2rem', textAlign: 'center' }}>
        There was an error...
      </p>
    );

  return (
    <div className="items">
      {taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
