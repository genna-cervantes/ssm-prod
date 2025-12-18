import LoginWithGoogleBtn from "../_components/LoginWithGoogleBtn";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/SSMNAI Logo.png"
              alt="Save Sierra Madre Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Save Sierra Madre Initiative</p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* Login Section */}
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-sm mb-6 text-center">
              Sign in with your authorized Google account to access the admin dashboard.
            </p>
            <LoginWithGoogleBtn />
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-400 text-center mt-8">
            Only pre-authorized accounts can access this portal.
            <br />
            Contact your administrator if you need access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
