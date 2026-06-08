export type TClass = {
  _id: string;
  name: string;
};

export type TSubject = {
  _id: string;
  name: string;
};

export type TBatch = {
  _id: string;
  title: string;
  className: {
    _id: string;
    name: string;
  };
  price: number;
  discountPersent: number;
  description: string;
  icon: string;
  slots: string;
};

export type TSubjectEntryForm = {
  subjectName: string;
  image: File | null;
  description: string;
};

export type TPlaylistForm = {
  className: string;
  subjects: TSubjectEntryForm[];
};

export type TVideo = {
  _id: string;
  className: {
    _id: string;
    name: string;
  };
  subjectName: {
    _id: string;
    name: string;
  };
  youtubeURL: string;
  name: string;
};

export type TNote = {
  _id: string;
  name: string;
  image: string;
  driveLink: string;
  existingImage?: string;
};
