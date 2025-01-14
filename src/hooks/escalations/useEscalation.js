import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getEscalations } from "../../store/actions/escalation/escalationActions";

const useEscalations = () => {
    const dispatch = useDispatch();
    const { escalations, error } = useSelector((state) => state.escalations);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEscalations = async () => {
            setLoading(true);
            try {
                await dispatch(getEscalations());
            } finally {
                setLoading(false);
            }
        };

        if (!escalations || escalations.length === 0) {
            fetchEscalations();
        }
    }, [dispatch, escalations]);

    return { escalations, error, loading };
};

export default useEscalations;
