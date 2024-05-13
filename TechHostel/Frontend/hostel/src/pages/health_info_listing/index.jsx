import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import { useHealthInfoData } from "../../hooks/useHealthInfoData";

const Index = () => {
  const { data: healthInfoItems } = useHealthInfoData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique categories
  const categories = useMemo(() => {
    const allCategories = healthInfoItems?.data.healthInfos.map(
      (info) => info.category
    );
    return ["All", ...new Set(allCategories)];
  }, [healthInfoItems]);

  // Filtered health information based on selected category and search term
  const filteredHealthInfos = useMemo(() => {
    return healthInfoItems?.data.healthInfos.filter((info) => {
      if (selectedCategory !== "All" && info.category !== selectedCategory) {
        return false;
      }
      if (searchTerm) {
        return (
          info.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          info.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    });
  }, [healthInfoItems, selectedCategory, searchTerm]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Health Informations</h1>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`btn ${
                selectedCategory === category
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="row">
          {filteredHealthInfos &&
            filteredHealthInfos.map((healthInfo, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{healthInfo.title}</h5>
                    <p className="card-text">{healthInfo.description}</p>
                    <p className="card-text">
                      <strong>Category:</strong> {healthInfo.category}
                    </p>
                    <p className="card-text">
                      <strong>Author:</strong> {healthInfo.author?.name} -{" "}
                      {healthInfo.author?.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Index;
