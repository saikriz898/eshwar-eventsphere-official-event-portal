import React from 'react';
import ErrorLayout from './ErrorLayout';
import { ShieldAlert } from 'lucide-react';

const Forbidden = () => {
    return (
        <ErrorLayout
            code="403"
            title="Access Denied"
            description="Your current identity signature lacks the necessary authorization codes to penetrate this restricted sector's encryption."
            icon={ShieldAlert}
            accentColor="rose"
        />
    );
};

export default Forbidden;
