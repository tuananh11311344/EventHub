import {EventModel} from '../models/EventModel';

export class Validate {
  static email(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  static Password = (val: string) => {
    return val.length >= 8;
  };

  static EventValidation = (data: EventModel) => {
    const errors: {[key: string]: string} = {};

    if (!data.title) {
      errors.title = 'Title is required';
    }
    if (!data.description) {
      errors.description = 'Description is required';
    }
    if (!data.category) {
      errors.category = 'Category is required';
    }
    if (!data.price) {
      errors.price = 'Price is required';
    }
    if (!data.photoUrl) {
      errors.photoUrl = 'PhotoUrl is required';
    }
    if (!data.location || !data.location.address) {
      errors.location = 'Location is required';
    }
    if (!data.titleAddress) {
      errors.titleAddress = 'Title address is required';
    }

    return errors;
  };
}
