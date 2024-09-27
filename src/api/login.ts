import apiClient from './axiosInstance';

const handleLogin = async (email: string, password: string) => {
  if (!email || !password) {
    alert('아이디와 비밀번호를 모두 입력해주세요.');
    return;
  }

  try {
    const response = await apiClient.post('/members/login', {
      email: email,
      password: password,
    });

    // Log the response data and Authorization header
    console.log('Response Data:', response.data);
    console.log('Authorization Header:', response.headers.authorization);

    // Proceed with navigation or storing the token
    // navigation.navigate('HomeScreen');
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // No response received from server
      console.error('Network Error:', error.request);
    } else {
      // Error setting up the request
      console.error('Error:', error.message);
    }
  }
};

export default handleLogin;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
