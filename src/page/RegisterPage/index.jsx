import { useRegisterUser } from "../../hooks/useRegisterUser";
import logo from "../../assets/loginpageee.png";
import logo1 from "../../assets/logologin.png";
const RegisterPage = () => {
  const {
    form,
    loading,
    success,
    isPasswordVisible,
    isPasswordRepeatVisible,
    setIsPasswordVisible,
    handleChange,
    handleRegister,
  } = useRegisterUser();

  return (
    <main
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{
        backgroundImage:
          "url('https://s3-wt-blog.worktile.com/wt-wordpress/kb/wp-content/uploads/2024/04/27063600/55be509c-2e37-44c6-97bd-671a60bf6dd5.webp')",
      }}
    >
      <div className="flex flex-col w-full max-w-4xl mx-4 bg-white rounded-lg shadow-md md:flex-row">
        <div className="w-full p-6 md:w-1/2 md:p-8">
          <div className="flex justify-center mb-6">
            <img
              src={logo1}
              alt="Logo image with a detailed description"
              className="w-20 h-20 md:w-24 md:h-24"
            />
          </div>
          <h1 className="mb-6 text-2xl font-bold text-center">Sign Up</h1>

          <div className="flex justify-center py-2">
            {success && (
              <p className="px-2 text-xs text-green-500 bg-green-200 rounded-md w-fit">
                {success}
              </p>
            )}
          </div>
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Masukan name"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Masukan username"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukan email"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 text-sm text-gray-500 right-3 hover:text-blue-500"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="passwordRepeat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmation Password
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="passwordRepeat"
                    name="passwordRepeat"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={form.passwordRepeat}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 text-sm text-gray-500 right-3 hover:text-blue-500"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Masukan Number"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign In Here!
            </a>
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src={logo}
            alt="A placeholder image with a detailed description of the image"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
