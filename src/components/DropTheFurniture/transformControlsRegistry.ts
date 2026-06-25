// 선택된 가구/방의 TransformControls 인스턴스를 전역에서 추적.
// 회전/크기 모드에서 핸들 클릭 위치에 다른 가구가 있으면 잘못 선택되는 문제를 막기 위해
// 모든 가구가 현재 활성 컨트롤의 상태(dragging/axis)를 참조할 수 있도록 한다.
export type ActiveTransformControls = {
  // 드래그(변형) 진행 중 여부
  dragging: boolean;
  // 마우스가 어떤 핸들 위에 있는지 (null이면 핸들 위 아님)
  axis: string | null;
} | null;

export const activeTransformControls: { current: ActiveTransformControls } = {
  current: null,
};

// OrbitControls 인스턴스를 전역에서 참조.
// TransformControls(이동/회전/크기 핸들) 드래그 중 카메라가 함께 움직이지 않도록
// 비활성화하기 위해 사용한다.
export const orbitControlsRef: { current: any } = {
  current: null,
};