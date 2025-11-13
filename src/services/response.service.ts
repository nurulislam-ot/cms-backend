class ResponseService {
  static success<T>(data: T, message = "Success") {
    return {
      success: true,
      message,
      data,
    }
  }

  static error(message = "Error", code = 500) {
    return {
      success: false,
      message,
      code,
    }
  }
}

export default ResponseService
