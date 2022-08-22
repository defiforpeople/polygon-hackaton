import { BlurPc } from './BlurPcFooterLanding';

function BlurFooterLanding() {
  return (
    <>
      <BlurPc position="absolute" style={{ filter: 'blur(50px)' }} />

      {/* <BlurMobile position="absolute" style={{ filter: 'blur(80px)' }} /> */}
    </>
  );
}

export default BlurFooterLanding;
