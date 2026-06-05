import Breadcrumb from "@/components/shared/Breadcrumb";

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3 max-w-3xl">
      <Breadcrumb items={[{ label: "Chính sách bảo mật" }]} />
      <h1 className="mb-6 font-bold text-3xl">Chính sách bảo mật</h1>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="mb-3 font-semibold text-foreground text-xl">
            1. Thông tin chúng tôi thu thập
          </h2>
          <p>
            Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi,
            chẳng hạn khi bạn tạo tài khoản, cập nhật hồ sơ, ứng tuyển việc làm
            hoặc liên hệ để được hỗ trợ. Thông tin này có thể bao gồm tên, địa
            chỉ email, số điện thoại, CV và các thông tin nghề nghiệp khác.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-foreground text-xl">
            2. Cách chúng tôi sử dụng thông tin của bạn
          </h2>
          <p>
            Chúng tôi sử dụng thông tin thu thập được để cung cấp, duy trì và
            cải thiện dịch vụ, bao gồm xử lý đơn ứng tuyển, ghép nối bạn với các
            cơ hội việc làm phù hợp và liên hệ với bạn về tài khoản cũng như các
            dịch vụ của chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-foreground text-xl">
            3. Chia sẻ thông tin
          </h2>
          <p>
            Chúng tôi có thể chia sẻ thông tin của bạn với nhà tuyển dụng khi
            bạn ứng tuyển qua nền tảng của chúng tôi. Chúng tôi không bán thông
            tin cá nhân của bạn cho bên thứ ba. Chúng tôi có thể chia sẻ thông
            tin tổng hợp, không định danh cá nhân, cho mục đích phân tích.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-foreground text-xl">
            4. Bảo mật dữ liệu
          </h2>
          <p>
            Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo
            vệ thông tin cá nhân của bạn khỏi việc truy cập, thay đổi, tiết lộ
            hoặc phá hủy trái phép.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-foreground text-xl">
            5. Quyền của bạn
          </h2>
          <p>
            Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình
            bất cứ lúc nào. Bạn có thể cập nhật thông tin hồ sơ trong cài đặt
            tài khoản hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-foreground text-xl">
            6. Liên hệ với chúng tôi
          </h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng
            liên hệ với chúng tôi tại privacy@sunfiresensei.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
