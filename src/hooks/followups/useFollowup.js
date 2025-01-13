import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFollowups } from "../../store/actions/followup/followupActions";

const useFollowups = () => {
  const dispatch = useDispatch();
  const { followups, error } = useSelector((state) => state.followups);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFollowups = async () => {
      if (!followups) {
        setLoading(true);
        try {
          await dispatch(getFollowups());
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFollowups();
  }, [dispatch, followups]);

  return { followups, error, loading };
};

export default useFollowups;
