import userAPI from '../api/userApi';
import {addFollowedEvent, updateFollowing} from '../redux/reducers/authReducer';

export class UserHandle {
  static getFollowedEventById = async (id: string, dispatch: any) => {
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
  static getFollowingById = async (id: string, dispatch: any) => {
    const api = `/get-followers?uid=${id}`;
    try {
      const res = await userAPI.HandleUser(api);
      if (res) {
        dispatch(updateFollowing(res.data));
      }
    } catch (error) {
      console.log('Update following error:', error);
    }
  };
}
