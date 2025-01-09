import userAPI from '../api/userApi';
import {addFollowedEvent} from '../redux/reducers/authReducer';

export class UserHandle {
  static getFollowedById = async (id: string, dispatch: any) => {
    const api = `/get-followed-events?uid=${id}`;

    try {
      const res = await userAPI.HandleUser(api);
      if (res && res.data) {
        dispatch(addFollowedEvent(res.data));
      }
    } catch (error) {
      console.log('Get followed error:', error);
    }
  };
}
