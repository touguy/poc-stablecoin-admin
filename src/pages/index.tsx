export default function Home() {
  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        스테이블 코인 메인 페이지
      </h1>
      <ul className="space-y-6">
        <li>
          <span className="font-semibold text-blue-700">1. 관리자 페이지</span>
          <div className="text-gray-700 ml-2">
            관리자 페이지에서는 스테이블 코인의 발행 및 환불 신청을 관리할 수
            있습니다.
            <br />
            좌측 메뉴를 통해 발행 신청, 환불 신청, 주소록 관리 등의 기능을
            이용할 수 있습니다.
          </div>
        </li>
        <li>
          <span className="font-semibold text-blue-700">2. 사용자 페이지</span>
          <div className="text-gray-700 ml-2">
            사용자 페이지에서는 스테이블 코인을 안전하게 전송하고 관리할 수
            있습니다.
            <br />
            지갑 연동 후, 네이티브 토큰을 다른 주소로 전송하거나 스마트
            컨트랙트를 배포할 수 있습니다.
          </div>
        </li>
      </ul>
      <div className="mt-8 text-center text-gray-500 text-sm">
        로그인을 통해 원하는 서비스를 사용하세요
      </div>
    </div>
  );
}
