import React from "react";
import { Box, styled } from "@mui/material";

const LoaderWrapper = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7452ffff, #4c9ffe);
  overflow: hidden;
`;

const LoaderGif = styled("img")`
  width: 200px;
  opacity: 0.9;
  animation: fadeIn 1s ease-in-out infinite alternate;

  @keyframes fadeIn {
    from {
      opacity: 0.6;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderGif
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHlyc3Z4MzhweWJhOWZnZHI5M2kxZWRvYnlvNTdsOTZxZDZwcXdoNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/jOgyNBSHNqCuIv7gMa/giphy.gif"
        alt="Loading..."
      />
    </LoaderWrapper>
  );
};

export default Loader;
