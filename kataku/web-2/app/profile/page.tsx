export default function Page() {
  return (
    <div>
      <h1>Welcome {'user'}!</h1>
      <button
        onClick={async () => {
          'use server';

          console.log('fsadlkfakl');
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
