import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        <img src="../public/loader.gif" alt="loader-animation" />
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default Loader;
