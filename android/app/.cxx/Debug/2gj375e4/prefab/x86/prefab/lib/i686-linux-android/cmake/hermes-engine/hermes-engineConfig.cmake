if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/ashishworkspace/.gradle/caches/8.12.1/transforms/d55660f6be33489fce313f6f523759ee/transformed/hermes-android-0.78.2-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/ashishworkspace/.gradle/caches/8.12.1/transforms/d55660f6be33489fce313f6f523759ee/transformed/hermes-android-0.78.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

