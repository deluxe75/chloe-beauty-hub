cmake_minimum_required(VERSION 3.21)

project(ChloeBeautyHubDesktop VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Widgets)

qt_add_executable(chloe_beauty_hub_desktop
    main.cpp
)

target_link_libraries(chloe_beauty_hub_desktop PRIVATE Qt6::Widgets)

set_target_properties(chloe_beauty_hub_desktop PROPERTIES
    WIN32_EXECUTABLE TRUE
    MACOSX_BUNDLE TRUE
)
