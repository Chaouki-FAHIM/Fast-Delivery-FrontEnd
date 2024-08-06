class OtpService {
    sendOtp(email: string): Promise<void> {
        return new Promise((resolve) => {
            console.log(`Sending OTP to ${email}...`);
            setTimeout(() => {
                console.log(`OTP sent to ${email} successfully.`);
                resolve();
            }, 1000); // Simulate a 1 second delay
        });
    }
}

export default new OtpService();
