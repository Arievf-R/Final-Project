import { useLoginUser } from "../../hooks/useLogin";
import logo from "../../assets/loginpageee.png";
import logo1 from "../../assets/logologin.png";
const LoginPage = () => {
  const {
    form,
    error,
    loading,
    success,
    isPasswordVisible,
    setIsPasswordVisible,
    handleChange,
    handleLogin,
  } = useLoginUser();
  return (
    <main
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{
        backgroundImage:
          "url('https://cdn-kb.worktile.com/kb/wp-content/uploads/2024/04/27134305/9d3dec97-619c-49e8-a9c6-812a341439c0.webp')",
      }}
    >
      <div className="flex flex-col w-full max-w-3xl bg-white rounded-lg shadow-md md:flex-row">
        <div className="w-full p-8 md:w-1/2">
          <div className="flex justify-center mb-6">
            <img
              src={logo1}
              alt="Logo image with a detailed description"
              className="w-24 h-24"
            />
          </div>
          <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
          <div className="flex justify-center py-2">
            {error && (
              <p className="px-2 text-xs text-red-500 bg-red-200 rounded-md w-fit">
                {error}
              </p>
            )}
            {success && (
              <p className="px-2 text-xs text-green-500 bg-green-200 rounded-md w-fit">
                {success}
              </p>
            )}
          </div>
          <form>
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
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
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
            <div className="mb-6 text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forget password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="my-6 text-sm text-center text-gray-500"></div>
          <div className="flex justify-center gap-4"></div>
          <p className="mt-6 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
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

export default LoginPage;
