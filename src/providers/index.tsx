import GoogleMapApiProvider from "@/providers/GoogleMapApiProvider";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <GoogleMapApiProvider>
      {children}
    </GoogleMapApiProvider>
  );
};

export default Providers;