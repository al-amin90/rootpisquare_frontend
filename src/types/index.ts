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
