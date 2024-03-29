import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createEvent } from "../../redux/event/eventAction";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  

  // useRef를 사용하여 "end-date" 요소에 접근
  const endDateRef = useRef(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    //document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10);
    // useRef로 얻은 "end-date" 요소의 min 속성 설정
    endDateRef.current.min = minEndDate.toISOString().slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("이벤트 추가완료!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 필드가 누락되었을 경우 각 필드마다 오류 메시지를 설정합니다.
    if (
      !name ||
      !description ||
      !category ||
      !discountPrice ||
      !stock ||
      !startDate ||
      !endDate ||
      !images.length
    ) {
      toast.error("이벤트 등록에 필요한 정보를 모두 입력해주세요.");
      return;
    }

    // 형식 변환 오류를 방지하기 위해 입력된 가격과 재고를 Number로 변환합니다.
    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice) : 0;
    const parsedDiscountPrice = parseFloat(discountPrice);
    const parsedStock = parseInt(stock);

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", parsedOriginalPrice);
    newForm.append("discountPrice", parsedDiscountPrice);
    newForm.append("stock", parsedStock);
    newForm.append("shopId", seller._id);
    if (startDate) {
      newForm.append("start_Date", startDate.toISOString());
    }
    if (endDate) {
      newForm.append("Finish_Date", endDate.toISOString());
    }
    dispatch(createEvent(newForm));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">이벤트 등록</h5>
      {/* create event form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            이벤트명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="이벤트 제품명 입력"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            이벤트 설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="이벤트 제품 설명 입력"
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">카테고리 선택</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">태그</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="이벤트 제품 태그 입력"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">기본 가격</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="이벤트 제품 가격 입력"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            가격 (할인 적용) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="이벤트 할인 가격"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            제품 재고 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="이벤트 제품 재고 입력"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            이벤트 시작 날짜 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={handleStartDateChange}
            min={today}
            placeholder="이벤트 제품 시작 입력"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            이벤트 종료 날짜 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="end-date"
            ref={endDateRef} // useRef로 "end-date" 요소에 ref 설정
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="이벤트 제품 종료 입력"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            이미지 업로드 <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="이벤트 등록"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
