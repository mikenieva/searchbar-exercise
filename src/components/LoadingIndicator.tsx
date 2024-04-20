import { RotatingTriangles } from 'react-loader-spinner';

const LoadingIndicator: React.FC = () => (
  <div className="flex justify-center my-4">
    <RotatingTriangles
      visible={true}
      height="80"
      width="80"
      ariaLabel="rotating-triangles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default LoadingIndicator;
