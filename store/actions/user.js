export const AddClip = ({ clip }) => {
  return {
    type: 'ADD_CLIP',
    clip,
  };
};

export const DeleteClip = ({ clip }) => {
  return {
    type: 'Delete_CLIP',
    clip,
  };
};
