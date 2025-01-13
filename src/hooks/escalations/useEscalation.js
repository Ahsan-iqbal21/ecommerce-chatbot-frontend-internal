import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getEscalations } from "../../store/actions/escalation/escalationActions";

const useEscalations = () => {
    const dispatch = useDispatch();
    const { escalations, error } = useSelector((state) => state.escalations);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEscalations = async () => {
          if (!escalations) {
            setLoading(true);
            try {
                await dispatch(getEscalations());
            } finally {
                setLoading(false);
            }
          }
        };

        fetchEscalations();
    }, [dispatch, escalations]);

    return { escalations, error, loading };
};

export default useEscalations;
