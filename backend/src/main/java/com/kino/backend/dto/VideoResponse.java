package com.kino.backend.dto;

import com.kino.backend.model.Video;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record VideoResponse(
        UUID id,
        String title,
        String description,
        String videoUrl,
        List<String> tags,
        BigDecimal accessPrice,
        BigDecimal suggestedDonation,
        String creatorName,
        Instant createdAt) {

    public static VideoResponse from(Video video) {
        return new VideoResponse(
                video.getId(), video.getTitle(), video.getDescription(), video.getVideoUrl(),
                video.getTags(), video.getAccessPrice(), video.getSuggestedDonation(),
                video.getCreator().getDisplayName(), video.getCreatedAt());
    }
}